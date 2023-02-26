import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const Label = styled.label``;
const Input = styled.input``;

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...otherProps} />
    </Container>
  );
};

export default FormInput;
