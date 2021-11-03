import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState("")

    const activateSpanMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateInputMode = () => {
        setEditMode(false)
        props.onChange(title);

    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activateInputMode();
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    return editMode
        ? <input onKeyPress={onKeyPressHandler} value={title} onBlur={activateInputMode} onChange={onChangeTitleHandler} autoFocus/>
        : <span onDoubleClick={activateSpanMode}>{props.title}</span>
}