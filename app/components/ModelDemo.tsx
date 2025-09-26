'use client';

import React, { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

interface ModelDemoProps {
  title: string;
  description: string;
}

const ModelDemo: React.FC<ModelDemoProps> = ({ title, description }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string>('');
  const [webMLSupported, setWebMLSupported] = useState<boolean>(false);
  const [backends, setBackends] = useState<string[]>([]);

  // Check WebML/WebNN support and available TensorFlow.js backends
  useEffect(() => {
    const checkSupport = async () => {
      // Check WebNN support
      const webNNSupported = 'ml' in navigator;
      setWebMLSupported(webNNSupported);

      // Get TensorFlow.js backends
      const availableBackends = tf.engine().registryFactory;
      const backendNames = Object.keys(availableBackends);
      setBackends(backendNames);

      console.log('WebNN supported:', webNNSupported);
      console.log('Available TensorFlow.js backends:', backendNames);
    };

    checkSupport();
  }, []);

  // Initialize TensorFlow.js
  const initializeTF = useCallback(async () => {
    setIsLoading(true);
    try {
      // Set backend preference: webgl > cpu
      await tf.setBackend('webgl');
      await tf.ready();
      
      console.log('TensorFlow.js backend:', tf.getBackend());
      console.log('TensorFlow.js version:', tf.version);
      
      setIsLoaded(true);
    } catch (error) {
      console.error('Failed to initialize TensorFlow.js:', error);
      // Fallback to CPU backend
      try {
        await tf.setBackend('cpu');
        await tf.ready();
        setIsLoaded(true);
      } catch (cpuError) {
        console.error('Failed to initialize CPU backend:', cpuError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Simple tensor operation demo
  const runDemo = useCallback(async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      // Create a simple model for demonstration
      const model = tf.sequential({
        layers: [
          tf.layers.dense({ units: 32, activation: 'relu', inputShape: [10] }),
          tf.layers.dense({ units: 16, activation: 'relu' }),
          tf.layers.dense({ units: 3, activation: 'softmax' })
        ]
      });

      // Create some dummy input data
      const inputData = tf.randomNormal([1, 10]);
      
      // Make a prediction
      const prediction = model.predict(inputData) as tf.Tensor;
      const predictionArray = await prediction.data();
      
      // Find the class with highest probability
      const maxIndex = predictionArray.indexOf(Math.max(...Array.from(predictionArray)));
      const confidence = predictionArray[maxIndex];
      
      setPrediction(`Class ${maxIndex} with ${(confidence * 100).toFixed(2)}% confidence`);
      
      // Clean up tensors
      inputData.dispose();
      prediction.dispose();
      model.dispose();
      
    } catch (error) {
      console.error('Demo failed:', error);
      setPrediction('Demo failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {description}
      </p>
      
      <div className="space-y-4">
        {/* System Information */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            System Information
          </h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>WebNN Support: {webMLSupported ? '✅ Yes' : '❌ No'}</li>
            <li>TensorFlow.js Version: {tf.version.tfjs}</li>
            <li>Current Backend: {isLoaded ? tf.getBackend() : 'Not initialized'}</li>
            <li>Available Backends: {backends.join(', ')}</li>
          </ul>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={initializeTF}
            disabled={isLoaded || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Initializing...' : isLoaded ? 'TensorFlow.js Ready' : 'Initialize TensorFlow.js'}
          </button>
          
          <button
            onClick={runDemo}
            disabled={!isLoaded || isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Running...' : 'Run Demo'}
          </button>
        </div>

        {/* Results */}
        {prediction && (
          <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Prediction Result
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDemo;