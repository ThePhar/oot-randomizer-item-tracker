local http          = require("socket.http")
local ltn12         = require("ltn12")
local eventlistener = require("data-eventlistener")

-- Set the timeout for waiting for a connection to the server.
-- WARNING: Setting this too high noticiably freeze the emulator until it times out if it loses connection.
--          Setting this too low may prevent the data from uploading to the server as it'd time out before connecting.
http.TIMEOUT = 0.1

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

while true do
    local trigger, data = eventlistener.watch()

    if trigger then
        local json = jsonify_save_data(data)
        send_data(json)
    end

    emu.frameadvance()
end
