import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
`;
const Label = styled.label``;
const Input = styled.input`
  padding: 1rem;
  font-size: 1.8rem;
  border-radius: 0.3rem;

  /* color: #cac7ff; */
  color: white;
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  /* background-color: transparent; */
`;

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...otherProps} />
    </Container>
  );
};

export default FormInput;
