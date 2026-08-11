export interface PlaceQuestion {
  id: string;
  landmarkName: string;
  imageUrl: string;
  correctCountry: string;
  options: string[];
}

export interface QuizStats {
  score: number;
  totalQuestions: number;
}
