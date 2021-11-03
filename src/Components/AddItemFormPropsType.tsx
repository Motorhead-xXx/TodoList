import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null){
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }
    return (
        <div>

            <TextField id="outlined-basic"
                       label={error? "":"Enter new task"}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       size={"small"}
                       error={!!error}
            />

            <Button variant={"contained"} color={"success"} style={{height: "39px", borderRadius:"0px"} } onClick={addTask}>
                <Add/>
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

})