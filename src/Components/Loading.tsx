interface Loading {
  isLoading: boolean;
}

const LoadingIcon = ({ isLoading }: Loading) => {
  return (
    <div
      className="modal-overlay"
      style={{ display: isLoading ? "flex" : "none" }}
    >
      <div className="modal-content">
        <div className="loading-icon"></div>
        <div className="loading-text">Por favor, Aguarde...</div>
      </div>
    </div>
  );
};

export default LoadingIcon;
