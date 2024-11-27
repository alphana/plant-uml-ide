import plantumlEncoder from 'plantuml-encoder';

export function encodePlantUML(text: string): string {
  return plantumlEncoder.encode(text);
}