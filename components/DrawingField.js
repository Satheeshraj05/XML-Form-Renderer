import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const WebDrawingCanvas = ({ onChange, id }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 200 });

  // Initialize canvas and context
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Check if context is available
      if (context) {
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.strokeStyle = '#000000';
        setCtx(context);

        // Set canvas size based on container size
        if (containerRef.current) {
          const { width } = containerRef.current.getBoundingClientRect();
          setCanvasSize({ width: width, height: 200 });
          canvas.width = width;
          canvas.height = 200;
        }
      }
    }
  }, []);

  // Helper function to get canvas position
  const getCanvasPosition = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  // Mouse event handlers
  const startDrawing = (e) => {
    if (!ctx) return;  // Prevent null errors

    setIsDrawing(true);
    ctx.beginPath();

    const { x, y } = getCanvasPosition(e);
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;

    const { x, y } = getCanvasPosition(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;

    setIsDrawing(false);
    ctx.closePath();

    if (onChange) {
      const imageData = canvasRef.current.toDataURL();
      onChange(id, imageData);
    }
  };

  const handleClear = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (onChange) {
      onChange(id, null);
    }
  };

  // Improved Touch Handling
  const handleTouchStart = (e) => {
    e.preventDefault();
    if (!ctx) return;

    const touch = e.touches[0];
    startDrawing({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!ctx) return;

    const touch = e.touches[0];
    draw({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  return (
    <View style={styles.webCanvasWrapper} ref={containerRef}>
      <div style={{ position: 'relative', width: '100%', height: '200px' }}>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
            touchAction: 'none',
            width: '100%',
            height: '100%'
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

// Native Placeholder for mobile
const NativeDrawingPlaceholder = ({ id, label, onChange }) => {
  return (
    <View style={styles.nativePlaceholder}>
      <Text style={styles.placeholderText}>
        Drawing functionality requires the react-native-sketch-canvas package.
      </Text>
      <TouchableOpacity style={styles.clearButton} onPress={() => {
        if (onChange) {
          onChange(id, null);
        }
      }}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawingField = ({ id, label, onChange }) => {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {isWeb ? (
        <WebDrawingCanvas id={id} onChange={onChange} />
      ) : (
        <NativeDrawingPlaceholder id={id} label={label} onChange={onChange} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  clearButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#333',
  },
  webCanvasWrapper: {
    marginBottom: 8,
    width: '100%',
  },
  nativePlaceholder: {
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default DrawingField;
