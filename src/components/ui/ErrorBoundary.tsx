import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-10 space-y-2">
          <i className="fa-solid fa-triangle-exclamation text-2xl text-copiv-red"></i>
          <p className="text-xs text-gray-400 font-sans">Componente temporalmente no disponible.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-[10px] text-copiv-gold underline cursor-pointer bg-transparent border-0 font-sans"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
