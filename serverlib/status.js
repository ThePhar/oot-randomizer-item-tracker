const FLAG_SONG_TIME    = 0x1;
const FLAG_SONG_STORM   = 0x2;
const FLAG_STONE_FOREST = 0x4;
const FLAG_STONE_FIRE   = 0x8;
const FLAG_STONE_WATER  = 0x10;
const FLAG_AGONY        = 0x20;
const FLAG_CARD         = 0x40;

const FLAG_SONG_SER     = 0x1;
const FLAG_SONG_REQ     = 0x2;
const FLAG_SONG_NOC     = 0x4;
const FLAG_SONG_PRE     = 0x8;
const FLAG_SONG_ZELDA   = 0x10;
const FLAG_SONG_EPONA   = 0x20;
const FLAG_SONG_SARIA   = 0x40;
const FLAG_SONG_SUN     = 0x80;

const FLAG_MED_FOREST   = 0x1;
const FLAG_MED_FIRE     = 0x2;
const FLAG_MED_WATER    = 0x4;
const FLAG_MED_SPIRIT   = 0x8;
const FLAG_MED_SHADOW   = 0x10;
const FLAG_MED_LIGHT    = 0x20;
const FLAG_SONG_MIN     = 0x40;
const FLAG_SONG_BOL     = 0x80;

const FLAG_SILVER_SCALE = 0x2;
const FLAG_GOLD_SCALE   = 0x4;
const FLAG_WALLET_ADULT = 0x10;
const FLAG_WALLET_GIANT = 0x20;

const FLAG_LIFT_BRACELET = 0x40;
const FLAG_LIFT_GAUNTLET = 0x80;

const FLAG_SWORD_KOKIRI  = 0x1;
const FLAG_SWORD_MASTER  = 0x2;
const FLAG_SWORD_GORON   = 0x4;
const FLAG_SHIELD_DEKU   = 0x10;
const FLAG_SHIELD_HYLIAN = 0x20;
const FLAG_SHIELD_MIRROR = 0x40;

const FLAG_TUNIC_GORON   = 0x2;
const FLAG_TUNIC_ZORA    = 0x4;
const FLAG_BOOTS_IRON    = 0x20;
const FLAG_BOOTS_HOVER   = 0x40;

function getByteFlags(byte) {
    const status = [byte["status1"], byte["status2"], byte["status3"]];
    const gear = [byte["gear1"], byte["gear2"]];
    const progressive = [byte["progressive1"], byte["progressive2"], byte["progressive3"]];

    return {
        songs: {
            zelda: !!(status[1] & FLAG_SONG_ZELDA),
            epona: !!(status[1] & FLAG_SONG_EPONA),
            saria: !!(status[1] & FLAG_SONG_SARIA),
            sun: !!(status[1] & FLAG_SONG_SUN),
            time: !!(status[0] & FLAG_SONG_TIME),
            storm: !!(status[0] & FLAG_SONG_STORM),
            minuet: !!(status[2] & FLAG_SONG_MIN),
            bolero: !!(status[2] & FLAG_SONG_BOL),
            serenade: !!(status[1] & FLAG_SONG_SER),
            nocturne: !!(status[1] & FLAG_SONG_NOC),
            requiem: !!(status[1] & FLAG_SONG_REQ),
            prelude: !!(status[1] & FLAG_SONG_PRE)
        },
        keyItems: {
            gerudoCard: !!(status[0] & FLAG_CARD),
            stoneOfAgony: !!(status[0] & FLAG_AGONY),
            scaleLevel: !!(progressive[1] & FLAG_SILVER_SCALE) + !!(progressive[1] & FLAG_GOLD_SCALE) * 2,
            walletLevel: !!(progressive[1] & FLAG_WALLET_ADULT) + !!(progressive[1] & FLAG_WALLET_GIANT) * 2,
            liftLevel: !!(progressive[2] & FLAG_LIFT_BRACELET) + !!(progressive[2] & FLAG_LIFT_GAUNTLET) * 2,
        },
        equipment: {
            swords: {
                kokiriSword: !!(gear[1] & FLAG_SWORD_KOKIRI),
                masterSword: !!(gear[1] & FLAG_SWORD_MASTER),
                bigSword:    !!(gear[1] & FLAG_SWORD_GORON),
            },
            shields: {
                dekuShield:  !!(gear[1] & FLAG_SHIELD_DEKU),
                hylianShield: !!(gear[1] & FLAG_SHIELD_HYLIAN),
                mirrorShield: !!(gear[1] & FLAG_SHIELD_MIRROR),
            },
            tunics: {
                goronTunic: !!(gear[0] & FLAG_TUNIC_GORON),
                zoraTunic: !!(gear[0] & FLAG_TUNIC_ZORA),
            },
            boots: {
                ironBoots: !!(gear[0] & FLAG_BOOTS_IRON),
                hoverBoots: !!(gear[0] & FLAG_BOOTS_HOVER),
            },
        },
        objectives: {
            skulltulaTokens: byte["skulltulas"],
            triforcePieces: 0, // TODO: Find memory location for this!
            emerald: !!(status[0] & FLAG_STONE_FOREST),
            ruby: !!(status[0] & FLAG_STONE_FIRE),
            sapphire: !!(status[0] & FLAG_STONE_WATER),
            lightMedallion: !!(status[2] & FLAG_MED_LIGHT),
            forestMedallion: !!(status[2] & FLAG_MED_FOREST),
            fireMedallion: !!(status[2] & FLAG_MED_FIRE),
            waterMedallion: !!(status[2] & FLAG_MED_WATER),
            shadowMedallion: !!(status[2] & FLAG_MED_SHADOW),
            spiritMedallion: !!(status[2] & FLAG_MED_SPIRIT),
        }
    }
}

module.exports = {
    getByteFlags
};
