import { useState } from "react";
import { Form } from "react-bootstrap";
import { Control, Controller, FieldValues, useController, UseControllerProps } from "react-hook-form";
import { getTime } from "./util";

interface Props extends UseControllerProps{
    control?: Control<FieldValues, any>;
    placeholder?: string;
    type? : string;
    label? : string;
    options?: any[];
}

export default function CustomInput(props:Props){
    const {field, fieldState } = useController({ ...props, defaultValue: "" });

    const [name , setName] = useState(props.options && props.options.length > 0 ?props.options[0].name : "");
    return(
        <>
        <Form.Group className={`mb-3`} controlId={props.name}>
                  <Form.Label>{props.label}</Form.Label>

                 {props.type && props.type === "select" ? (
                    <Controller
                    control={props.control}
                    name={props.name}
                    defaultValue={props.options && props.options.length > 0 ?props.options[0].name : ""}
                    render={({ field }) => (
                      
                      <Form.Select
                        {...field}
                        isInvalid={!!fieldState.error}
                        placeholder={props.placeholder}
                      >
                        {props.options && props.options.length > 0 && props.options.map((item) => {
                          console.log(field);
                          return(
                            <option key={item.name} value={item.name}>{item.name}</option>
                          );
                        } )}
                        
                      </Form.Select>
                    )}
                  />
                 ): (
                    <Controller
                  
                    control={props.control}
                    name={props.name}
                    defaultValue={props.defaultValue}
                    render={({ field }) => (
                      <Form.Control
                        type={props.type? props.type : "text"}
                        {...field}
                       value= {props.type === "time" ? getTime(field.value) : field.value}
                        isInvalid={!!fieldState.error}
                        placeholder={props.placeholder}
                      />
                    )}
                  />

                 )}

                
                  </Form.Group>
        </>
    );
}