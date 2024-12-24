import React from 'react';

import LONER_ICON from '../../assets/loner_icon.png';
import BANDIT_ICON from '../../assets/bandit_icon.png';
import CLEAR_SKY_ICON from '../../assets/clear_sky_icon.png';
import DUTY_ICON from '../../assets/duty_icon.png';
import ECOLOGIST_ICON from '../../assets/ecologist_icon.png';
import FREEDOM_ICON from '../../assets/freedom_icon.png';
import MERC_ICON from '../../assets/merc_icon.png';
import MONOLITH_ICON from '../../assets/monolith_icon.png';
import UKM_ICON from '../../assets/ukm_icon.png';

const FACTION_LOGO = {
    LONER: LONER_ICON,
    BANDIT: BANDIT_ICON,
    CLEAR_SKY: CLEAR_SKY_ICON,
    DUTY: DUTY_ICON,
    ECOLOGIST: ECOLOGIST_ICON,
    FREEDOM: FREEDOM_ICON,
    MERC: MERC_ICON,
    MONOLITH: MONOLITH_ICON,
    UKM: UKM_ICON,
};

export const Message = ({ authenticatedUser, message }) => {
    const isMessageCurrentUser = message.userId.username === authenticatedUser.user.username;
    const renderMessageIcon = (message) => {

        if (message.userId.username) {
            return <img style={{ width: 30, height: 30, borderRadius: '10%' }} src={FACTION_LOGO[message.userId.faction]} />;
        }
        return <div style={{ width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24, fontWeight: 700, backgroundColor: 'lightgray' }}>?</div>
    }
    return (
        <div style={{ display: 'flex', justifyContent: isMessageCurrentUser ? 'flex-end' : 'flex-start', alignItems: isMessageCurrentUser ? 'flex-end' : 'flex-start', flexDirection: 'column', marginTop: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {message.userId.username !== authenticatedUser.user.username ?
                    renderMessageIcon(message) : <div style={{ width: 30, height: 30, display: 'flex' }} />}
                <div style={{ fontWeight: 500, color: '#e1e3d7', marginLeft: 8 }}>{(isMessageCurrentUser ? 'You' : message.userId.username) || 'Anonymous'} • {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: 'numeric',
                    minute: '2-digit'
                })}</div>
            </div>
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 38 }}>
                <button style={{ backgroundColor: isMessageCurrentUser ? '#0e2432' : '#f0f2e4', display: 'flex', width: '100%', flexDirection: 'row' }}>
                    <div>
                        <div style={{ color: isMessageCurrentUser ? '#e1e3d7' : '#0e2432' }}>{message.content}</div>
                    </div>
                </button>
            </div>
        </div>
    )
}