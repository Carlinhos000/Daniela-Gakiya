'use client';
import Component from '@/components/ui/scroll-animation';
function ComponentDemo() {
  return <><div className="h-[500px] grid place-content-center"/><div className="py-2"><div>
    <Component direction="left" viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }} className="text-5xl text-left py-44"><p>Scroll Left</p></Component>
    <Component direction="right" viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }} className="text-5xl text-right py-44"><p>Scroll Right</p></Component>
    <Component viewport={{ amount: 0.5, margin: '0px 0px 0px 0px' }} className="text-5xl text-center py-44"><p>Scroll bottom</p></Component>
  </div></div></>;
}
export { ComponentDemo as DemoOne };
