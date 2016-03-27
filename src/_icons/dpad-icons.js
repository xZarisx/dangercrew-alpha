import React from 'react'

/* Dpad arrows */
export function verticalDpadArrow(width, classNames="") {
    return (
        <svg width={width} className={classNames}  viewBox="0 0 44 66" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" opacity="0.5">
                <g transform="translate(-724.000000, -391.000000)" stroke="#FFFFFF">
                    <g transform="translate(676.000000, 317.000000)">
                        <g transform="translate(48.000000, 74.000000)">
                            <path d="M0,5.00452127 C0,2.24060049 2.24245787,0 5.00452127,0 L38.9954787,0 C41.7593995,0 44,2.24245787 44,5.00452127 L44,38.9954787 C44,41.7593995 42.4878509,45.6496172 40.6227275,47.6842973 L25.3772725,64.3157027 C23.5120564,66.3504839 20.4878509,66.3503828 18.6227275,64.3157027 L3.37727253,47.6842973 C1.51205642,45.6495161 0,41.7575421 0,38.9954787 L0,5.00452127 Z" id="Rectangle-1-Copy" stroke-width="2" transform="translate(22.000000, 32.920875) rotate(-180.000000) translate(-22.000000, -32.920875) "></path>
                            <path d="M13,53.6198189 L21.9806025,44.8639596 L30.961205,53.6198189"  strokeWidth="4" transform="translate(21.980603, 49.241889) rotate(-180.000000) translate(-21.980603, -49.241889) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}
export function horizontalDpadArrow(width, classNames="") {
    return (
        <svg width={width} className={classNames} viewBox="0 0 66 44" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" opacity="0.5">
                <g transform="translate(-676.000000, -365.000000)" stroke="#FFFFFF">
                    <g transform="translate(676.000000, 317.000000)">
                        <g transform="translate(0.000000, 48.000000)">
                            <path d="M11.0791247,-5.91635407 C11.0791247,-8.68027485 13.3215825,-10.9208753 16.0836459,-10.9208753 L50.0746034,-10.9208753 C52.8385242,-10.9208753 55.0791247,-8.67841748 55.0791247,-5.91635407 L55.0791247,28.0746034 C55.0791247,30.8385242 53.5669756,34.7287418 51.7018521,36.763422 L36.4563972,53.3948273 C34.5911811,55.4296086 31.5669756,55.4295075 29.7018521,53.3948273 L14.4563972,36.763422 C12.5911811,34.7286407 11.0791247,30.8366668 11.0791247,28.0746034 L11.0791247,-5.91635407 Z" id="Rectangle-1-Copy" stroke-width="2" transform="translate(33.079125, 22.000000) rotate(-90.000000) translate(-33.079125, -22.000000) "></path>
                            <path d="M8.27750823,26.8585322 L17.2581108,18.1026728 L26.2387133,26.8585322" strokeWidth="4" transform="translate(17.258111, 22.480603) rotate(-90.000000) translate(-17.258111, -22.480603) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}