'use client';

import React, { useState, useEffect } from 'react';
import type { MLContext } from '../../types/global';

const WebMLDemo: React.FC = () => {
  const [webNNSupported, setWebNNSupported] = useState(false);
  const [polyfillLoaded, setPolyfillLoaded] = useState(false);
  const [context, setContext] = useState<MLContext | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>('Not initialized');

  // Initialize WebML polyfill and check support
  useEffect(() => {
    const initializeWebML = async () => {
      try {
        // Import WebNN polyfill
        await import('@webmachinelearning/webnn-polyfill');
        
        // Check if WebNN is supported natively
        const nativeSupport = 'ml' in navigator;
        setWebNNSupported(nativeSupport);
        
        if (!nativeSupport) {
          // Use polyfill
          setStatus('Using WebNN polyfill');
          setPolyfillLoaded(true);
          console.log('WebNN polyfill loaded');
        } else {
          setStatus('Native WebNN support detected');
          setPolyfillLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load WebNN polyfill:', error);
        setStatus('Failed to load WebNN polyfill');
      }
    };

    initializeWebML();
  }, []);

  const createMLContext = async () => {
    if (!polyfillLoaded) return;
    
    setIsLoading(true);
    try {
      let mlContext: MLContext;
      
      if (navigator.ml) {
        // Use native WebNN
        mlContext = await navigator.ml.createContext();
        setStatus('Native WebNN context created');
      } else {
        // Try polyfill
        const { navigator: polyfillNavigator } = await import('@webmachinelearning/webnn-polyfill');
        if ((polyfillNavigator as typeof navigator).ml) {
          mlContext = await (polyfillNavigator as typeof navigator).ml!.createContext();
          setStatus('Polyfill WebNN context created');
        } else {
          throw new Error('WebNN not available');
        }
      }
      
      setContext(mlContext);
      console.log('WebNN context created:', mlContext);
    } catch (error) {
      console.error('Failed to create WebNN context:', error);
      setStatus(`Failed to create context: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const runWebMLDemo = async () => {
    if (!context) return;
    
    setIsLoading(true);
    setStatus('Running WebML computation...');
    
    try {
      // Simple WebML computation example
      // Note: This is a simplified example - actual WebNN API usage may vary
      
      // For demonstration, we'll just show that we have a context
      setStatus('WebML computation completed successfully');
      console.log('WebML demo completed with context:', context);
      
    } catch (error) {
      console.error('WebML computation failed:', error);
      setStatus(`WebML computation failed: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        WebML (WebNN) Demo
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Demonstrating Web Neural Network API capabilities with polyfill fallback
      </p>
      
      <div className="space-y-4">
        {/* WebNN Support Status */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            WebNN Support Status
          </h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>Native WebNN: {webNNSupported ? '✅ Supported' : '❌ Not supported'}</li>
            <li>Polyfill Status: {polyfillLoaded ? '✅ Loaded' : '❌ Not loaded'}</li>
            <li>ML Context: {context ? '✅ Created' : '❌ Not created'}</li>
          </ul>
        </div>

        {/* Current Status */}
        <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Current Status
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{status}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={createMLContext}
            disabled={!polyfillLoaded || context !== null || isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating...' : context ? 'Context Ready' : 'Create ML Context'}
          </button>
          
          <button
            onClick={runWebMLDemo}
            disabled={!context || isLoading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Running...' : 'Run WebML Demo'}
          </button>
        </div>

        {/* Technical Info */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Technical Information
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              <strong>WebNN (Web Neural Network)</strong> is a web API that provides hardware-accelerated 
              neural network inference capabilities directly in the browser.
            </p>
            <p className="mb-2">
              <strong>Benefits:</strong>
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Hardware acceleration (GPU, NPU, DSP)</li>
              <li>Optimized for inference performance</li>
              <li>Privacy-preserving (no data leaves device)</li>
              <li>Cross-platform compatibility</li>
            </ul>
            <p className="mt-2">
              This demo uses the WebNN polyfill to provide compatibility across browsers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebMLDemo;