import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Loader2, Brain, AlertCircle, Volume2, MessageSquare, RotateCcw } from 'lucide-react';
import { useVoiceRecording } from '../hooks/useVoiceRecording';
import { omniDimensionAPI } from '../services/omniDimensionAPI';

interface ProcessingStep {
  step: 'recording' | 'transcribing' | 'echoing' | 'thinking' | 'responding' | 'complete';
  message: string;
}

const SolutionTab: React.FC = () => {
  const [processingStep, setProcessingStep] = useState<ProcessingStep | null>(null);
  const [error, setError] = useState<string>('');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [canAskNew, setCanAskNew] = useState(true);
  
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    error: recordingError,
  } = useVoiceRecording();

  const handleVoiceQuery = async () => {
    if (!audioBlob) return;

    setError('');
    setUserQuestion('');
    setAiResponse('');
    setCanAskNew(false);

    try {
      // Step 1: Convert speech to text
      setProcessingStep({ step: 'transcribing', message: 'Converting your voice to text...' });
      const transcript = await omniDimensionAPI.speechToText(audioBlob);
      
      if (!transcript.trim()) {
        throw new Error('No speech detected. Please try speaking more clearly.');
      }
      
      setUserQuestion(transcript);
      
      // Step 2: Echo what user said (both display and speak)
      setProcessingStep({ step: 'echoing', message: 'Repeating what you asked...' });
      const echoText = `You asked: ${transcript}`;
      
      // Speak the echo
      if ('speechSynthesis' in window) {
        omniDimensionAPI.speakText(echoText);
        // Wait for echo to complete
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
      // Step 3: Send to GPT and get response
      setProcessingStep({ step: 'thinking', message: 'Getting answer from AI tutor...' });
      const gptAnswer = await omniDimensionAPI.processWithAI(transcript);
      setAiResponse(gptAnswer);
      
      // Step 4: Speak the GPT response
      setProcessingStep({ step: 'responding', message: 'Speaking the answer...' });
      
      if ('speechSynthesis' in window) {
        omniDimensionAPI.speakText(gptAnswer);
      }
      
      // Step 5: Complete
      setTimeout(() => {
        setProcessingStep({ step: 'complete', message: 'Complete! Ask another question or regenerate answer.' });
        setCanAskNew(true);
      }, 2000);
      
    } catch (error) {
      console.error('Error processing voice query:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      setProcessingStep(null);
      setCanAskNew(true);
    }
  };

  const handleRegenerateAnswer = async () => {
    if (!userQuestion) return;
    
    setError('');
    setAiResponse('');
    setCanAskNew(false);
    
    try {
      setProcessingStep({ step: 'thinking', message: 'Generating new answer...' });
      const newAnswer = await omniDimensionAPI.processWithAI(userQuestion);
      setAiResponse(newAnswer);
      
      setProcessingStep({ step: 'responding', message: 'Speaking the new answer...' });
      
      if ('speechSynthesis' in window) {
        omniDimensionAPI.speakText(newAnswer);
      }
      
      setTimeout(() => {
        setProcessingStep({ step: 'complete', message: 'New answer ready! Ask another question or regenerate again.' });
        setCanAskNew(true);
      }, 2000);
      
    } catch (error) {
      console.error('Error regenerating answer:', error);
      setError('Failed to regenerate answer. Please try again.');
      setProcessingStep(null);
      setCanAskNew(true);
    }
  };

  const handleNewQuestion = () => {
    setUserQuestion('');
    setAiResponse('');
    setProcessingStep(null);
    setError('');
    setCanAskNew(true);
  };

  useEffect(() => {
    if (audioBlob && !isRecording) {
      handleVoiceQuery();
    }
  }, [audioBlob, isRecording]);

  useEffect(() => {
    if (isRecording) {
      setProcessingStep({ step: 'recording', message: 'Listening... Tap again to stop or wait for silence' });
    }
  }, [isRecording]);

  const getStepIcon = (step: string) => {
    switch (step) {
      case 'recording': return <Mic className="h-5 w-5" />;
      case 'transcribing': return <Loader2 className="h-5 w-5 animate-spin" />;
      case 'echoing': return <Volume2 className="h-5 w-5" />;
      case 'thinking': return <Brain className="h-5 w-5" />;
      case 'responding': return <Volume2 className="h-5 w-5" />;
      case 'complete': return <MessageSquare className="h-5 w-5" />;
      default: return <Loader2 className="h-5 w-5 animate-spin" />;
    }
  };

  const getStepColor = (step: string) => {
    switch (step) {
      case 'recording': return 'text-red-600 bg-red-50 border-red-200';
      case 'transcribing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'echoing': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'thinking': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'responding': return 'text-green-600 bg-green-50 border-green-200';
      case 'complete': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Brain className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Easy Learn - AI Voice Tutor
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Ask questions using your voice and get instant spoken answers in English
        </p>
      </div>

      {/* Voice Recording Section */}
      <div className="bg-white rounded-2xl shadow-xl p-12 mb-8">
        <div className="text-center">
          <div className="relative mb-8">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!canAskNew}
              className={`relative w-40 h-40 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isRecording
                  ? 'bg-red-500 shadow-2xl shadow-red-500/40 animate-pulse'
                  : !canAskNew
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl hover:shadow-3xl'
              }`}
            >
              {!canAskNew && processingStep?.step !== 'recording' ? (
                <Loader2 className="h-16 w-16 animate-spin" />
              ) : isRecording ? (
                <MicOff className="h-16 w-16" />
              ) : (
                <Mic className="h-16 w-16" />
              )}
              
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
              )}
            </button>
          </div>

          <div className="space-y-6">
            {/* Processing Status */}
            {processingStep && (
              <div className={`flex items-center justify-center space-x-3 p-4 rounded-xl border max-w-md mx-auto ${getStepColor(processingStep.step)}`}>
                {getStepIcon(processingStep.step)}
                <span className="font-medium text-lg">{processingStep.message}</span>
              </div>
            )}

            {/* Default State */}
            {!processingStep && !error && !userQuestion && canAskNew && (
              <div className="space-y-4">
                <p className="text-gray-600 text-xl font-medium">
                  Tap the microphone to ask your question
                </p>
                <p className="text-gray-500">
                  Recording stops automatically after 2 seconds of silence
                </p>
                <p className="text-gray-400 text-sm">
                  Perfect for GATE, NEET, JEE preparation
                </p>
              </div>
            )}

            {/* User's Question Display */}
            {userQuestion && (
              <div className="bg-blue-50 p-6 rounded-xl max-w-2xl mx-auto border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>You asked:</span>
                </h4>
                <p className="text-blue-700 text-lg">{userQuestion}</p>
              </div>
            )}

            {/* AI Response Display */}
            {aiResponse && (
              <div className="bg-green-50 p-6 rounded-xl max-w-2xl mx-auto border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Answer:</span>
                </h4>
                <p className="text-green-700 text-lg leading-relaxed">{aiResponse}</p>
              </div>
            )}

            {/* Action Buttons */}
            {processingStep?.step === 'complete' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button
                  onClick={handleRegenerateAnswer}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Regenerate Answer</span>
                </button>
                <button
                  onClick={handleNewQuestion}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Mic className="h-5 w-5" />
                  <span>Ask New Question</span>
                </button>
              </div>
            )}

            {/* Error Display */}
            {(recordingError || error) && (
              <div className="flex items-center justify-center space-x-3 text-red-600 bg-red-50 p-6 rounded-xl max-w-md mx-auto border border-red-200">
                <AlertCircle className="h-6 w-6" />
                <span className="text-sm font-medium">{recordingError || error}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mic className="h-8 w-8 text-red-600" />
            </div>
            <h4 className="font-bold mb-2 text-sm">1. Record</h4>
            <p className="text-gray-600 text-xs">Click mic and speak your question</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-bold mb-2 text-sm">2. Convert</h4>
            <p className="text-gray-600 text-xs">Voice converted to text</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-bold mb-2 text-sm">3. Echo</h4>
            <p className="text-gray-600 text-xs">System repeats your question</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
            <h4 className="font-bold mb-2 text-sm">4. Think</h4>
            <p className="text-gray-600 text-xs">AI processes and generates answer</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Volume2 className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-bold mb-2 text-sm">5. Answer</h4>
            <p className="text-gray-600 text-xs">Listen to spoken explanation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionTab;