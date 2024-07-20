'use client';
import ScrollAnimation from 'react-animate-on-scroll';
import { useUser } from '@/context/Context'

import { Translator, getTranslation } from '@miracleufo/react-g-translator';

export default function Button({ styled, children }) {
    const { cliente, languaje } = useUser()

    
    return (
        <ScrollAnimation animateIn='flipInX'
            afterAnimatedIn={function afterAnimatedIn(v) {
                var t = "Animate In finished.\n";
                t += 'v.onScreen: ' + v.onScreen + '\n';
                t += 'v.inViewport: ' + v.inViewport;

            }}
        >
            <div className="p-10 uppercase" >
                <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}> {children}</Translator>
            </div>
        </ScrollAnimation>
    )
}
