local eventlistener = {}
local data = {}
local trigger = true

function health()
    local health_sram = 0x11A600
    local health = mainmemory.read_u16_be(health_sram)

    if (health ~= data.health) then
        data.health = health
        trigger = true
    end
end

function eventlistener.watch()
    -- Check and update all data variables.
    health()

    -- If any of these events have changed, call for an update.
    if trigger then
        trigger = false
        return true, data
    end

    -- Otherwise, ignore this frame.
    return false
end

return eventlistener
