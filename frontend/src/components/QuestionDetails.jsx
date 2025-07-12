import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await axios.get(`/api/questions/${id}`);
        const aRes = await axios.get(`/api/answers/${id}`);
        setQuestion(qRes.data);
        setAnswers(aRes.data);
      } catch (err) {
        console.error("Error fetching question or answers", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    if (!newAnswer.trim()) return alert("Answer cannot be empty");

    try {
      await axios.post(
        "/api/answers",
        {
          questionId: id,
          description: newAnswer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setNewAnswer("");
      const refreshedAnswers = await axios.get(`/api/answers/${id}`);
      setAnswers(refreshedAnswers.data);
    } catch (err) {
      alert("Failed to post answer");
    }
  };

  if (!question) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <p className="mb-2">{question.description}</p>
      <p className="text-sm text-gray-500 mb-4">Tags: {question.tags.join(", ")}</p>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold mb-3">Answers</h2>
      {answers.length === 0 ? (
        <p className="text-gray-500">No answers yet.</p>
      ) : (
        answers.map((ans) => (
          <div key={ans._id} className="border p-3 rounded mb-3 bg-gray-50">
            <p>{ans.description}</p>
            <p className="text-sm text-gray-600 mt-2">— {ans.userId?.username || "Anonymous"}</p>
          </div>
        ))
      )}

      <hr className="my-4" />

      {token ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full h-32 border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your answer here..."
          />
          <button
            onClick={handleSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Answer
          </button>
        </div>
      ) : (
        <p className="mt-4 text-red-500">Login to post an answer.</p>
      )}
    </div>
  );
}
