local http          = require("socket.http")
local ltn12         = require("ltn12")

-- Set the timeout for waiting for a connection to the server.
-- WARNING: Setting this too high noticiably freeze the emulator until it times out if it loses connection.
--          Setting this too low may prevent the data from uploading to the server as it'd time out before connecting.
http.TIMEOUT = 0.1

local sram = {}
local trigger = false

-- Function for sending the HTTP POST request.
function send_data(data)
    local request_body = data
    local response_body = {}

    local res, code, response_headers = http.request {
        url = "http://localhost:8080/data",
        method = "POST",
        headers = {
            ["Content-Type"] = "application/json",
            ["Content-Length"] = #request_body
        },
        source = ltn12.source.string(request_body),
        sink = ltn12.sink.table(response_body)
    }


end
-- Function for converting raw bytes to JSON array of numbers.
function jsonify_save_data(data)
    local json = ""
    for k, v in pairs(data) do
        json = json .. '"' .. k .. '":' .. v .. ','
    end

    -- Remove the last comma character
    json = json:sub(1, #json - 1)
    return '{' .. json .. '}'
end
-- Function for generating ram watchers.
function create_ram_watcher(variable, address, read_func)
    return function()
        local value = read_func(address)

        if (value ~= sram[variable]) then
            sram[variable] = value
            trigger = true
        end
    end
end
function create_ram_watcher_specific(variable, address, watch_val, read_func)
    -- Initialize our variable if it's not already.
    if (sram[variable] == nil) then
        sram[variable] = 0
    end

    return function()
        local value = read_func(address)

        if (sram[variable] ~= watch_val and value == watch_val) then
            sram[variable] = watch_val
            trigger = true
        elseif (sram[variable] == watch_val and value ~= watch_val) then
            -- Reset everything since the state has finished!
            sram[variable] = 0
            trigger = true
        end
    end
end
-- Function for checking for memory updates.
function event_update()
    -- Check and update all data variables being watched.
    --create_ram_watcher('x'           , 0x1DAA54, mainmemory.read_u32_be)()
    --create_ram_watcher('y'           , 0x1DAA58, mainmemory.read_u32_be)()
    --create_ram_watcher('z'           , 0x1DAA5C, mainmemory.read_u32_be)()
    create_ram_watcher_specific('linkState', 0x1DB09C, 0x04000000, mainmemory.read_u32_be)()
    create_ram_watcher('health'      , 0x11A600, mainmemory.read_u16_be)()
    create_ram_watcher('maxHealth'   , 0x11A5FE, mainmemory.read_u16_be)()
    create_ram_watcher('rupees'      , 0x11A604, mainmemory.read_u16_be)()
    create_ram_watcher('skulltulas'  , 0x11A6A0, mainmemory.read_u16_be)()
    create_ram_watcher('deaths'      , 0x11A5F2, mainmemory.read_u16_be)()
    create_ram_watcher('triforces'   , 0x11AE96, mainmemory.read_u16_be)()
    create_ram_watcher('clothing'    , 0x11A66C, mainmemory.read_u8)()
    create_ram_watcher('arms'        , 0x11A66D, mainmemory.read_u8)()
    create_ram_watcher('dekuCapacity', 0x11A671, mainmemory.read_u8)()
    create_ram_watcher('bSWCapacity' , 0x11A672, mainmemory.read_u8)()
    create_ram_watcher('qBSCapacity' , 0x11A673, mainmemory.read_u8)()
    create_ram_watcher('magic'       , 0x11A603, mainmemory.read_u8)()
    create_ram_watcher('maxMagic'    , 0x11A602, mainmemory.read_u8)()
    create_ram_watcher('heartPieces' , 0x11A674, mainmemory.read_u8)()
    create_ram_watcher('statusByte1' , 0x11A675, mainmemory.read_u8)()
    create_ram_watcher('statusByte2' , 0x11A676, mainmemory.read_u8)()
    create_ram_watcher('statusByte3' , 0x11A677, mainmemory.read_u8)()

    -- If any of these variables have changed, call for an update.
    if trigger then
        trigger = false
        return true
    end
end

while true do
    if event_update() then
        send_data(jsonify_save_data(sram))
    end

    emu.frameadvance()
end
