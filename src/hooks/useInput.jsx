import { useState } from 'react';

export default function useInput(value) {
    const [state, setState] = useState(value);

    const onStateChange = (event) => {
        setState(event.target.value);
    }

    return [state, onStateChange];
}