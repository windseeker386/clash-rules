// Personal rules first, with Steam downloads DIRECT and storefront PROXY.
function main(config, profileName) {
  const target = "🚀 节点选择";
  const exists = (config["proxy-groups"] ?? []).some(g => g.name === target)
    || (config.proxies ?? []).some(p => p.name === target);
  if (!exists) throw new Error("Personal rules: missing proxy group " + target);

  // Specific content-download hosts MUST precede the broader Steam web rules.
  const steamRules = [
    "DOMAIN,steamcdn-a.akamaihd.net,DIRECT",
    "DOMAIN-SUFFIX,steamcontent.com,DIRECT",
    "DOMAIN-SUFFIX,steamserver.net,DIRECT",
    "DOMAIN-SUFFIX,cm.steampowered.com,DIRECT",
    "DOMAIN-SUFFIX,steamusercontent.com,DIRECT",
    "DOMAIN-SUFFIX,steamcommunity.com," + target,
    "DOMAIN,store.steampowered.com," + target,
    "DOMAIN-SUFFIX,steampowered.com," + target
  ];
  const personal = "RULE-SET,personal-custom-proxy," + target;
  const current = config.rules ?? [];
  config.rules = [
    ...steamRules,
    personal,
    ...current.filter(r => r !== personal && !steamRules.includes(r))
  ];
  return config;
}
