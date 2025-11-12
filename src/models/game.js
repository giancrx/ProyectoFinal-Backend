import mongoose from "mongoose";
import Review from "./review.js"; // importa el modelo de Review

const gameSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        genero: { type: String, required: true },
        plataforma: { type: String, required: true },
        añoLanzamiento: { type: Number, required: true },
        desarrollador: { type: String },
        imagenPortada: { type: String },
        descripcion: { type: String },
        completado: { type: Boolean, default: false },
        fechaCreacion: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

// Middleware: borrar reseñas asociadas al eliminar un juego
gameSchema.pre("findOneAndDelete", async function (next) {
  const game = await this.model.findOne(this.getFilter());
  if (game) {
    await Review.deleteMany({ juegoId: game._id });
    console.log(`🧹 Reseñas del juego "${game.titulo}" eliminadas.`);
  }
  next();
});

export default mongoose.model("Game", gameSchema);
