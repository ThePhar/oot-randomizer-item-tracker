import React from "react";
import socketIOClient from "socket.io-client";

import "../stylesheets/App.scss";

import GearTrackers from "./GearTrackers";
import ObjectiveTracker from "./ObjectiveTracker";
import SongTracker from "./SongTracker";
import TestItemRendering from "./test-components/TestItemRendering";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: "http://localhost:9876",
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
            <div className="app">
                <div>
                    <div style={{ width: 584, backgroundColor: "mediumpurple", padding: 16 }}>
                        <div style={{ position: "absolute" }}>
                            <div style={{
                                width: 8,
                                height: 8,
                                backgroundColor: "black",
                                position: "absolute",
                                top: 360,
                                left: 600
                            }} />

                            <div style={{
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                borderWidth: "8px 0 0 8px",
                                borderColor: "transparent transparent transparent rebeccapurple",
                                position: "absolute",
                                top: -16,
                                left: 600
                            }} />
                            <div style={{
                                width: 8,
                                height: 368,
                                backgroundColor: "rebeccapurple",
                                position: "absolute",
                                top: -8,
                                left: 600
                            }} />
                            <div style={{
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                borderWidth: "0 8px 8px 0",
                                borderColor: "transparent rebeccapurple transparent transparent",
                                position: "absolute",
                                top: 360,
                                left: 600
                            }} />

                            <div style={{
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                borderWidth: "0 8px 8px 0",
                                borderColor: "transparent #4d2673 transparent transparent",
                                position: "absolute",
                                top: 360,
                                left: -16
                            }} />
                            <div style={{
                                width: 608,
                                height: 8,
                                backgroundColor: "#4d2673",
                                position: "absolute",
                                top: 360,
                                left: -8
                            }} />
                            <div style={{
                                width: 0,
                                height: 0,
                                borderStyle: "solid",
                                borderWidth: "8px 0 0 8px",
                                borderColor: "transparent transparent transparent #4d2673",
                                position: "absolute",
                                top: 360,
                                left: 600
                            }} />
                        </div>
                        <GearTrackers {...gear} />
                        <ObjectiveTracker {...gear.objectives} />
                        <SongTracker {...gear.songs} />
                    </div>

                </div>
            </div>
        );
    }
}
