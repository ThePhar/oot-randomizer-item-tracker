local http  = require("socket.http");
local ltn12 = require("ltn12");

-- Set the timeout for waiting for a connection to the server.
-- WARNING: Setting this too high noticiably freeze the emulator until it times out if it loses connection.
--          Setting this too low may prevent the data from uploading to the server as it'd time out before connecting.
http.TIMEOUT = 0.1;

local save_memory_location = 0x11A5D0;
local save_memory_size     = 0x200;
local frame_counter        = 0;
local sync_interval        = 300;

-- Function for sending the HTTP POST request.
function send_data(data)
    local request_body = data;
    local response_body = {};

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
function jsonify_save_ram()
    local json = "[";

    for i = 0, save_memory_size do
        json = json .. mainmemory.read_u8(save_memory_location + i) .. ","
    end

    return json .. "null]";
end

while true do
    if (frame_counter % sync_interval == 0) then
        -- Package up save memory and send to server.
        local data = jsonify_save_ram();
        send_data(data)

        -- Reset the frame counter.
        frame_counter = 0;
    end

    -- Allow the emulator to continue.
    frame_counter = frame_counter + 1;
    emu.frameadvance();
end
