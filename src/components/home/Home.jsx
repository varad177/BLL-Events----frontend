import React from "react";

import HomeCards from "./HomeCards";
import Navbar from "../Navbar/Navbar";
import AnimationWrapper from "../Animation-wrapper/AnimationWrapper";

const Home = () => {
    return (
        <div>
            <Navbar />
            <AnimationWrapper>
                <HomeCards />
            </AnimationWrapper>
        </div>
    );
};

export default Home;
