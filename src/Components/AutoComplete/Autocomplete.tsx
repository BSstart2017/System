import React, {ChangeEvent, FC, useEffect} from "react"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng, Suggestion,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {Input} from "antd";

const Autocomplete: FC<PropsType> = ({isLoaded}) => {

    const {
        ready,
        init,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: true,
        debounce: 300,
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({description}: Suggestion) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                console.log(description)
                clearSuggestions();

                // Get latitude and longitude via utility functions
                getGeocode({ address: description })
                    .then((results) => getLatLng(results[0]))
                    .then(({ lat, lng }) => {
                        console.log("📍 Coordinates: ", { lat, lng });
                    })
                    .catch((error) => {
                        console.log("😱 Error: ", error);
                    });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        })

    useEffect(()=>{
        if(isLoaded){
            init()
        }
    },[init,isLoaded])

    return (
        <div ref={ref}>
            <Input
                type={'text'}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
            />
            {status === "OK" && <ul>{renderSuggestions()}</ul>}
        </div>
    );
};

export {Autocomplete}

type PropsType ={
    isLoaded: boolean
}