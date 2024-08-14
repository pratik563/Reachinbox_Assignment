import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "tailwindcss/tailwind.css";

function Onebox() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [reply, setReply] = useState("");
  const [error, setError] = useState(null);

  const apiToken = "";

  useEffect(() => {
    axios
      .get("https://hiring.reachinbox.xyz/api/v1/onebox/list/", {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((response) => setThreads(response.data))
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "D" && selectedThread) {
        deleteThread(selectedThread.id);
      } else if (event.key === "R") {
        document.getElementById("quill-editor").focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedThread]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const selectThread = (id) => {
    axios
      .get(`https://hiring.reachinbox.xyz/api/v1/onebox/list/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then((response) => setSelectedThread(response.data))
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        console.error(
          "Error fetching thread details:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const deleteThread = (id) => {
    axios
      .delete(`/api/onebox/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      })
      .then(() => {
        setThreads(threads.filter((thread) => thread.id !== id));
        setSelectedThread(null);
      })
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        console.error(
          "Error deleting thread:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const sendReply = () => {
    axios
      .post(
        `/api/onebox/reply`,
        {
          threadId: selectedThread.id,
          content: reply,
        },
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      )
      .then((response) => {
        alert("Reply sent successfully");
        setReply("");
      })
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        console.error(
          "Error sending reply:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
      [{ "custom-save": "Save" }, { "custom-variables": "Variables" }],
    ],
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen`}
    >
      <div className="flex">
        <div className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4">
          <h2 className="font-bold mb-4">Threads</h2>
          <ul>
            {threads.map((thread) => (
              <li
                key={thread.id}
                className="cursor-pointer"
                onClick={() => selectThread(thread.id)}
              >
                {thread.subject}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-4">
          {selectedThread ? (
            <>
              <h2 className="font-bold mb-4">{selectedThread.subject}</h2>
              <p>{selectedThread.content}</p>
              <div className="mt-4">
                <ReactQuill
                  id="quill-editor"
                  theme="snow"
                  value={reply}
                  onChange={setReply}
                  modules={modules}
                />
                <button
                  className="mt-4 bg-blue-500 text-white p-2 rounded"
                  onClick={sendReply}
                >
                  Send Reply
                </button>
              </div>
            </>
          ) : (
            <p>Select a thread to view details</p>
          )}
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={toggleTheme}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {""}
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded">{`Error: ${error}`}</div>
      )}
    </div>
  );
}

export default Onebox;
