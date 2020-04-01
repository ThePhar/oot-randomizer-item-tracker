import React from "react";
import socketIOClient from "socket.io-client";

import GearTrackers from "./GearTrackers";
import ObjectiveTracker from "./ObjectiveTracker";
import SongTracker from "./SongTracker";
import TestItemRendering from "./test-components/TestItemRendering";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:8080",
            gear: {
                objectives: {
                    skulltulaTokens: 0,
                    triforcePieces: 0,
                    emerald: false,
                    ruby: false,
                    sapphire: false,
                    lightMedallion: false,
                    forestMedallion: false,
                    fireMedallion: false,
                    waterMedallion: false,
                    shadowMedallion: false,
                    spiritMedallion: false,
                },
                items: [],
                equipment: {
                    swords: {
                        kokiriSword: false,
                        masterSword: false,
                        bigSword: false
                    },
                    shields: {
                        dekuShield: false,
                        hylianShield: false,
                        mirrorShield: false,
                    },
                    tunics: {
                        goronTunic: false,
                        zoraTunic: false
                    },
                    boots: {
                        ironBoots: false,
                        hoverBoots: false
                    }
                },
                keyItems: {
                    gerudoCard: false,
                    stoneOfAgony: false,
                    liftLevel: 0,
                    scaleLevel: 0,
                    walletLevel: 0,
                    magicLevel: 0
                },
                songs: {
                    zelda: false,
                    epona: false,
                    saria: false,
                    sun: false,
                    time: false,
                    storm: false,
                    minuet: false,
                    bolero: false,
                    serenade: false,
                    nocturne: false,
                    requiem: false,
                    prelude: false
                }
            }
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => this.setState({ gear: data }));
    }

    render() {
        const gear = this.state.gear;

        return (
            <div>
                <div style={{ width: 584, backgroundColor: "mediumpurple", padding: 16 }}>
                    <GearTrackers {...gear} />
                    <ObjectiveTracker {...gear.objectives} />
                    <SongTracker {...gear.songs} />
                </div>
                <br />
                <TestItemRendering />
            </div>
        );
    }
}
