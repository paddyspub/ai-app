import ModelDemo from './components/ModelDemo';
import WebMLDemo from './components/WebMLDemo';
import ImageClassificationDemo from './components/ImageClassificationDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI App - WebML & TensorFlow.js
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Demonstrating Web Machine Learning capabilities with Next.js
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Welcome to the AI Demo
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                This application demonstrates the integration of modern web-based AI technologies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>TensorFlow.js</strong> - Run machine learning models directly in the browser
                </li>
                <li>
                  <strong>WebML/WebNN</strong> - Hardware-accelerated neural network inference
                </li>
                <li>
                  <strong>Next.js</strong> - Modern React framework for production-ready web apps
                </li>
              </ul>
              <p>
                Each demo below showcases different aspects of web-based machine learning, 
                from basic tensor operations to image classification.
              </p>
            </div>
          </div>

          {/* Demo Components */}
          <div className="grid gap-8">
            <ModelDemo
              title="TensorFlow.js Basic Demo"
              description="Basic TensorFlow.js operations with backend detection and simple neural network inference."
            />
            
            <WebMLDemo />
            
            <ImageClassificationDemo />
          </div>

          {/* Footer Info */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              About This Project
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p>
                This project demonstrates how to integrate Web Machine Learning technologies 
                into a modern Next.js application. It showcases both TensorFlow.js for 
                JavaScript-based ML and WebNN for hardware-accelerated inference.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                  Next.js 15
                </span>
                <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs">
                  TensorFlow.js
                </span>
                <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs">
                  WebML/WebNN
                </span>
                <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-xs">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
