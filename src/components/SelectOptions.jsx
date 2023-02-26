import styled from "styled-components";
import React, { useState } from "react";
import Select from "react-select";

const Container = styled.div``;

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export default function SelectOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Container>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </Container>
  );
}
