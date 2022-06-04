import React, { useRef, useLayoutEffect, useState } from 'react'

const TextArea = (props) => {

    const textareaRef = useRef(null);
    const [value, setValue] = useState(props.body);
    const onChange = (event) => setValue(event.target.value);
    const use = props.use

    const MIN_TEXTAREA_HEIGHT = props.minH;

    useLayoutEffect(() => {
        if (props.focus) {
            // Reset height - important to shrink on delete
            textareaRef.current.style.height = "inherit";
            // textareaRef.current.style.width = 100;
            // Set height
            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
            )}px`;
            textareaRef.current.click()
        }
        if (!props.focus) {
            props.setBody(value)
        }
    }, [value, props.focus]);


    return (
        <div className="textbody">
            <div className="input-group-prepend">
                {/* <span className="input-group-text">{use}</span> */}
            </div>
            {props.focus ? <textarea autoFocus required className="form-control" aria-label="With textarea" placeholder="Enter the Text Here...."
                onChange={onChange} ref={textareaRef} defaultValue={value} onBlur={() => props.setFocus(false)}></textarea>
                : <>
                    {use === "Title" && <h5 className="card-title" style={{ cursor: "pointer" }} onClick={() => props.setFocus(true)}>{value ? value : `Click Here To Add ${use}`}</h5>}
                    {use === "Description" && <p className="card-text" style={{ cursor: "pointer" }} onClick={() => props.setFocus(true)}>{value ? value : `Click Here To Add ${use}`}</p>}
                    {use !== "Title" && use !== "Description" && <p style={{ whiteSpace: 'pre-wrap', cursor: "pointer" }} onClick={() => props.setFocus(true)}>{value ? value : `Click Here To Add ${use}`}</p>}
                </>
            }
        </div>
    )
}



TextArea.defaultProps = {
    use: "Text",
    minH: 100,
}

export default TextArea