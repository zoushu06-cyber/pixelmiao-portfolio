import { useState, type FormEvent } from 'react';
import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { BlurText } from '@/components/motion/BlurText';
import { Reveal } from '@/components/motion/Reveal';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 演示用：接后端时把这里替换成真实提交逻辑
    setSent(true);
  };

  return (
    <Section theme="dark" className="contact" label="联系页">
      <div className="contact__glow" aria-hidden="true" />
      <div className="u-container contact__inner">
        <div className="contact__head">
          <span className="u-eyebrow">{site.contact.eyebrow}</span>
          <span className="u-index contact__availability">
            <i /> {site.contact.availability}
          </span>
        </div>

        <BlurText as="h1" lines={['HELLO,', 'SAY HI.']} className="contact__title" stagger={64} accentLine={1} />

        <div className="contact__grid">
          <Reveal className="contact__left" delay={120}>
            <p className="u-lead">{site.contact.desc}</p>
            <a className="contact__email" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
              <span aria-hidden="true">↗</span>
            </a>
            <div className="contact__links">
              {site.contact.links.map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal className="contact__right" delay={200}>
            <form className="contact-form" onSubmit={onSubmit}>
              <span className="u-eyebrow">或直接留个言 / DROP A LINE</span>
              <label className="contact-form__field">
                <span>你的邮箱</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              <label className="contact-form__field">
                <span>简单说说</span>
                <textarea rows={3} placeholder="项目类型、时间、想做的事…" />
              </label>
              <Button type="submit" variant="light" size="lg">
                {sent ? '已收到，谢谢！' : '发送'}
              </Button>
              {sent && <p className="contact-form__note">这是前端演示，接上后端后即可真正收信。</p>}
            </form>
          </Reveal>
        </div>

        <div className="contact__foot">
          <span className="u-index">BASED IN CHINA · WORKING WORLDWIDE</span>
          <span className="u-index">{site.edition}</span>
        </div>
      </div>
    </Section>
  );
}
