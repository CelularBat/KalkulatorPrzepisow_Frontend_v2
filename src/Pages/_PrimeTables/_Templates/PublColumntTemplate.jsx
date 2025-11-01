import React from 'react';
import IMG_Padlock from "@/assets/padlock.png";
import IMG_Public from "@/assets/public.png";

export const PublColumnTemplate = ({ isPublic }) => {
    return isPublic ? (
        <span className="UserTable--Public-True">
            <img className="UserTable--Public-icon" src={IMG_Public} />
        </span>
    ) : (
        <span className="UserTable--Public-False">
            <img className="UserTable--Public-icon" src={IMG_Padlock} />
        </span>
    );
};
