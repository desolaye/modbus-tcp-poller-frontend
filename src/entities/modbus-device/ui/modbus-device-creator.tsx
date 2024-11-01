type ModbusDeviceCreatorProps = {
  onClick: () => void;
};

export const ModbusDeviceCreator = (props: ModbusDeviceCreatorProps) => {
  const { onClick } = props;

  return (
    <section style={{ width: "100%" }}>
      <button
        className="button_secondary"
        onClick={onClick}
        style={{ width: "100%" }}
      >
        +
      </button>
    </section>
  );
};
