import TextEditor from './TextEditor';

const Editor = ({ error, isPending, status }) => {
  return (
    <div className="editor-page">
      {error && <div>{error}</div>}
      <header className="header">
        <h1>Tell me about your story</h1>
        <p>Story title: <input placeholder="Three Little Pigs" id="title"></input></p>
      </header>
      {isPending && <div className="loading">Loading...</div>}
      {status && <div className="editor"><TextEditor status={status} /></div>}
    </div>
  );
};

export default Editor;