import {supportServices} from './supportServices.js';

export const contactTopics=['事業・サービスについて',...supportServices.map(service=>service.name+'について'),'協業・研究について','取材について','採用について','個人情報の取り扱いについて','その他'];

export function contactTopicFor(search) {
  const params=new URLSearchParams(search);
  const topics={recruit:'採用について',privacy:'個人情報の取り扱いについて'};
  const subject=params.get('subject');
  if(Object.hasOwn(topics,subject))return topics[subject];
  const service=supportServices.find(item=>item.slug===params.get('service'));
  return service?service.name+'について':contactTopics[0];
}
