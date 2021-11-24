import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";


type AddItemForm = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function (props: AddItemForm) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   size={"small"}
                   disabled={props.disabled}
        />
        <IconButton color={"success"} onClick={addItem} disabled={props.disabled}>
            <AddBox/>
        </IconButton>
    </div>
})
