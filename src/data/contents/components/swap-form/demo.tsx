"use client"

import { useState } from 'react'
import { SwapForm } from '.'

function SwapFormDemo() {
    const [isSignIn, setIsSignIn] = useState(true);
    return (
        <div className="flex items-center justify-center">

            <SwapForm
                isSignIn={isSignIn}
                onModeChange={setIsSignIn}
            />
        </div>
    )
}

export default SwapFormDemo