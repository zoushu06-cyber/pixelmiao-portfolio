import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BlurText } from '@/components/motion/BlurText';

export default function NotFoundPage() {
  return (
    <Section theme="dark" className="notfound" label="页面未找到">
      <div className="u-container notfound__inner">
        <span className="u-eyebrow">ERROR / 404</span>
        <BlurText as="h1" lines={['走丢了。']} className="notfound__title" stagger={60} />
        <p className="u-lead">这个地址暂时没有内容，回到首页继续逛逛吧。</p>
        <Button to="/" variant="light" size="lg">
          回到首页
        </Button>
        <span className="notfound__big" aria-hidden="true">
          404
        </span>
      </div>
    </Section>
  );
}
