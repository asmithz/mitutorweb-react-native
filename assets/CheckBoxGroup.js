import { Checkbox } from "native-base"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"

const CheckBoxGroup = (props) => {
    const [groupValues, setgroupValues] = useState([])
    useEffect(()=>{
        props.func(props.field, groupValues)
    },[groupValues])
    return(
        <Checkbox.Group
        onChange={setgroupValues}
        value={groupValues}
        >
        {props.checkboxes.map((checkbox) => {
            return checkbox
        })}
        </Checkbox.Group>
    )
}

export default CheckBoxGroup