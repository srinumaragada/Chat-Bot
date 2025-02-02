import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Button from "../utils/Button";
import ProgressSteps from "../utils/ProgressSteps";

const DUMMY_PAGES = [
  {
    url: "/about",
    status: "completed",
    chunks: [
      "Company overview and mission statement",
      "Team member biographies",
      "Company history and milestones",
    ],
  },
  {
    url: "/products",
    status: "completed",
    chunks: [
      "Product features and specifications",
      "Pricing information",
      "Technical documentation",
    ],
  },
  {
    url: "/contact",
    status: "in_progress",
    chunks: ["Office locations", "Contact form fields"],
  },
  {
    url: "/blog",
    status: "pending",
    chunks: [],
  },
];

const WebsiteScan = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [expandedPage, setExpandedPage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    DUMMY_PAGES.forEach((_, index) => {
      setTimeout(() => setHighlightIndex(index), index * 3200);
    });

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200  to-yellow-300">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <ProgressSteps
          steps={["Account", "Organization", "Website Scan", "Integration"]}
          currentStep={2}
        />

        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Website Scan</h2>
              <p className="mt-2 text-sm text-gray-600">
                We're analyzing your website to train your chatbot
              </p>
            </div>
            <Button
              className={`${
                progress === 100
                  ? "bg-orange-500 hover:bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => {
                if (progress === 100) {
                  navigate("/integration");
                }
              }}
              disabled={progress < 100}
            >
              Continue to Integration
            </Button>
          </div>

          <div className="mt-8">
            <div className="mb-4 rounded-lg bg-amber-200 p-4 shadow">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Scan Progress
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {progress}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {DUMMY_PAGES.map((page, index) => (
                <div
                  key={page.url}
                  className={`rounded-lg p-4 shadow  bg-amber-200${
                    index === highlightIndex ? " bg-orange-500" : "bg-white"
                  } transition-all duration-500`}
                >
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() =>
                      setExpandedPage(
                        expandedPage === page.url ? null : page.url
                      )
                    }
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(page.status)}
                      <span className="font-medium text-gray-900">
                        {page.url}
                      </span>
                    </div>
                    {expandedPage === page.url ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  {expandedPage === page.url && page.chunks.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="mb-2 text-sm font-medium text-gray-700">
                        Extracted Data
                      </h4>
                      <ul className="space-y-2">
                        {page.chunks.map((chunk, index) => (
                          <li
                            key={index}
                            className="rounded-md bg-gray-50 p-2 text-sm text-gray-600"
                          >
                            {chunk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteScan;
