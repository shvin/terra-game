import React from 'react';
import { Game } from './Game';
import { Leaderboard } from './Leaderboard';

import '../App.css';

export const HomeScreen = () => {
    return (
        <div className="App">
            <div className="container">
                <div className="home-screen">
                    <p className="home-option">Play</p>
                    <p className="home-option">Leaderboard</p>
                    <p className="home-option">How to play</p>
                </div>
            </div>
        </div>
    )
}
