import React, {ChangeEvent, FC, useCallback, useEffect} from "react"
import usePlacesAutocomplete, {getGeocode, getLatLng, Suggestion} from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import {Input} from "antd"
import styles from './Autocomplete.module.css'
import {PositionCenterType} from '../../redux/OrderMapReducer'

const Autocomplete: FC<PropsType> = ({isLoaded, onSelect}) => {

    const {ready, init, value, suggestions: {status, data}, setValue,
        clearSuggestions} = usePlacesAutocomplete({initOnMount: false,})

    const ref = useOnclickOutside(() => clearSuggestions())
    const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [setValue])

    const handleSelect = useCallback(({description}: Suggestion) => () => {
        setValue(description, false)
        clearSuggestions()

        getGeocode({address: description})
            .then((results) => getLatLng(results[0]))
            .then(({lat, lng}) => onSelect({lat, lng}))
            .catch((error) => console.log("😱 Error: ", error))

    },[onSelect,setValue, clearSuggestions])

    const renderSuggestions = useCallback(() => {
        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: {main_text, secondary_text},
            } = suggestion;

            return (
                <li className={styles.listItem} key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        })
    },[data, handleSelect])

    useEffect(() => {
        if (isLoaded) init()
    }, [init, isLoaded])

    return (
        <div ref={ref}>
            <Input type={'text'} value={value} onChange={handleInput} disabled={!ready} placeholder="Where are you going?"/>
            {status === "OK" && <ul className={styles.suggestions}>{renderSuggestions()}</ul>}
        </div>
    )
}

export {Autocomplete}

type PropsType = {
    isLoaded: boolean
    onSelect: (position: PositionCenterType) => void
}

