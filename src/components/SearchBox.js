import React, { useState } from 'react';

export default (props) => {
    const [val, setVal] = useState(props.value || '');
    const onChange = (e) => {
        setVal(e.target.value);
        props.onChange && props.onChange(e.target.value);
    }
    return (
        <div>
            <input className="tvdb-input"
                value= {val} 
                type="text" 
                onChange={onChange}
                placeholder={props.placeholder || 'Search'}
            />
        </div>
    );
}



