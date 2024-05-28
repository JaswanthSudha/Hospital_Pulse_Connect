const tf = require('@tensorflow/tfjs');
const tfnode = require("@tensorflow/tfjs-node")
const fs = require('fs');
const path = require('path');
// const mongoose = require("mongoose")
// const imageModel = require("../models/image")
// const url = "mongodb+srv://ayushvadodariya12:xYGAJH6cO9Ks1FQq@cluster0.d9xtewg.mongodb.net/hpc?retryWrites=true&w=majority&appName=Cluster0"

function nodeBundleResourceIO(modelJsonPath, weightPaths) {
    return {
        load: async function () {
            const modelJson = JSON.parse(fs.readFileSync(modelJsonPath, 'utf-8'));
            const weightSpecs = modelJson.weightsManifest[0].weights;
            const weightData = new Uint8Array(weightPaths.reduce((acc, weightPath) => {
                const weightBuffer = fs.readFileSync(weightPath);
                const newArray = new Uint8Array(acc.length + weightBuffer.byteLength);
                newArray.set(acc, 0);
                newArray.set(new Uint8Array(weightBuffer), acc.length);
                return newArray;
            }, new Uint8Array()));

            return {
                modelTopology: modelJson.modelTopology,
                weightSpecs,
                weightData: weightData.buffer,
            };
        },
    };
}

const loadModel = async () => {
    await tf.ready();
    const modelJsonPath = path.resolve(__dirname, 'jsModelFinal', 'model.json');
    const weightsDir = path.resolve(__dirname, 'jsModelFinal');
    const weightFiles = fs.readdirSync(weightsDir).filter(file => file.endsWith('.bin')).map(file => path.join(weightsDir, file));

    try {
        const model = await tf.loadLayersModel(nodeBundleResourceIO(modelJsonPath, weightFiles));
        // model.summary();
        return model
    } catch (error) {
        console.error('Error loading the model:', error);
    }
};
function preprocessImage(buffer) {
    // Decode image buffer to tensor
    const imageTensor = tfnode.node.decodeImage(buffer, 3);

    // Resize image to the required size for the model (e.g., 224x224)
    const resizedImage = tfnode.image.resizeBilinear(imageTensor, [64, 64]);

    // Normalize the image (if required by your model)
    const normalizedImage = resizedImage.div(tfnode.scalar(255));

    // Add a batch dimension (required for prediction)
    const batchedImage = normalizedImage.expandDims(0);

    return batchedImage;
}
const prediction = async (buffer) => {
    try {
        // const image = await imageModel.findById({ _id: "6653faa3f488fd3a15158ca5" })
        const inputTensor = preprocessImage(buffer);
        const model = await loadModel();
        const prediction = model.predict(inputTensor);
        const predictedClass = prediction.argMax(-1).dataSync()[0];
        return predictedClass

    }
    catch (error) {
        throw new Error("Report Not Generated")
    }
}
module.exports = { prediction }
