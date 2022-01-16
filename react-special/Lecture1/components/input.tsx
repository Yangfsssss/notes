import React from 'react';

const Input = (props: CustomizeInputProps) => {
  return <input {...props} />;
};

type CustomizeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default class CustomizeInput extends React.Component<CustomizeInputProps> {
  constructor(props: CustomizeInputProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { value = '', ...otherProps } = this.props;

    return (
      <div style={{ padding: '10px' }}>
        <Input style={{ outline: 'none' }} value={value} {...otherProps} />
      </div>
    );
  }
}
