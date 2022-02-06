import React from 'react';
import {AppFastTaxiDriver} from './App';
import * as reactRedux from "react-redux";
import {render, screen} from "@testing-library/react";


describe('AppFastTaxiDriver', ()=>{

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')

  it('AboutMe render initialized true',async ()=>{
    useSelectorMock.mockReturnValueOnce(true)
    render(<AppFastTaxiDriver/>)
  })

  it('AboutMe render initialized false',  ()=>{
    useSelectorMock.mockReturnValue(false)
    render(<AppFastTaxiDriver/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})