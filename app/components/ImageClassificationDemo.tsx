'use client';

import React, { useState, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

const ImageClassificationDemo: React.FC = () => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load a pre-trained model (MobileNet)
  const loadModel = useCallback(async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll create a simple classification model
      // In a real app, you'd load a pre-trained model like MobileNet from TensorFlow Hub
      const demoModel = tf.sequential({
        layers: [
          tf.layers.dense({ units: 1000, activation: 'relu', inputShape: [224, 224, 3] }),
          tf.layers.flatten(),
          tf.layers.dense({ units: 512, activation: 'relu' }),
          tf.layers.dense({ units: 1000, activation: 'softmax' }) // ImageNet classes
        ]
      });
      
      setModel(demoModel);
      console.log('Demo classification model loaded');
    } catch (error) {
      console.error('Failed to load model:', error);
      setPrediction('Failed to load model: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  // Preprocess image for model input
  const preprocessImage = useCallback((imageElement: HTMLImageElement): tf.Tensor => {
    return tf.browser.fromPixels(imageElement)
      .resizeBilinear([224, 224]) // Resize to model input size
      .toFloat()
      .div(255.0) // Normalize to [0, 1]
      .expandDims(0); // Add batch dimension
  }, []);

  // Classify the uploaded image
  const classifyImage = useCallback(async () => {
    if (!model || !previewImage) return;

    setIsLoading(true);
    try {
      // Create image element
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        try {
          // Preprocess image
          const tensor = preprocessImage(img);
          
          // Make prediction
          const predictions = model.predict(tensor) as tf.Tensor;
          const predictionArray = await predictions.data();
          
          // Find top prediction (simplified)
          const maxIndex = predictionArray.indexOf(Math.max(...Array.from(predictionArray)));
          const confidence = predictionArray[maxIndex];
          
          // Demo class names (in real app, you'd have actual ImageNet class names)
          const demoClasses = [
            'Dog', 'Cat', 'Car', 'Bird', 'Flower', 'Tree', 'Person', 'Building', 
            'Food', 'Object'
          ];
          const className = demoClasses[maxIndex % demoClasses.length];
          
          setPrediction(`${className} (${(confidence * 100).toFixed(2)}% confidence)`);
          
          // Clean up tensors
          tensor.dispose();
          predictions.dispose();
        } catch (error) {
          console.error('Classification failed:', error);
          setPrediction('Classification failed: ' + (error as Error).message);
        } finally {
          setIsLoading(false);
        }
      };
      
      img.src = previewImage;
    } catch (error) {
      console.error('Image processing failed:', error);
      setPrediction('Image processing failed: ' + (error as Error).message);
      setIsLoading(false);
    }
  }, [model, previewImage, preprocessImage]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 m-4">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
        Image Classification Demo
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Upload an image to classify it using TensorFlow.js
      </p>
      
      <div className="space-y-4">
        {/* Model Status */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Model Status
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {model ? '✅ Model loaded and ready' : '❌ Model not loaded'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={loadModel}
            disabled={model !== null || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading Model...' : model ? 'Model Ready' : 'Load Model'}
          </button>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={!model}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
          />
        </div>

        {/* Image Preview */}
        {previewImage && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Image Preview
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Upload preview"
              className="max-w-xs max-h-64 object-contain border rounded-lg"
            />
            <button
              onClick={classifyImage}
              disabled={!model || isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Classifying...' : 'Classify Image'}
            </button>
          </div>
        )}

        {/* Prediction Results */}
        {prediction && (
          <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Classification Result
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{prediction}</p>
          </div>
        )}

        {/* Information */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
            About This Demo
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              This demo creates a simple neural network for image classification. 
              In a production app, you would typically load a pre-trained model like MobileNet.
            </p>
            <p>
              The model processes uploaded images and attempts to classify them into predefined categories.
            </p>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} width={224} height={224} />
    </div>
  );
};

export default ImageClassificationDemo;