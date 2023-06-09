export type NumOrStr = number | string;
export type Children = object[];
export type Size = {
    width: number;
    height: number;
};
export type VerticalLine = {
    x: number;
};
export type HorizontalLine = {
    y: number;
};
export type Line = VerticalLine | HorizontalLine;
export type Point = VerticalLine & HorizontalLine;
export type Points = Point[];
export type Rect = Point & Size;
export type ZeroOrOne = 0 | 1 | '0' | '1';
export type Square = {
    x: number;
    y: number;
    side: number;
};
export type Arc = {
    rx: number;
    ry: number;
    angle: number;
    largeArcFlag: ZeroOrOne;
    sweepFlag: ZeroOrOne;
    x: number;
    y: number;
};
export type Attrs = {
    [key: string]: any;
};
//# sourceMappingURL=index.d.ts.map