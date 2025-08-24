---
title: '第四期神经计算建模及编程培训笔记'
slug: 'brainpy'
publishDate: 2025-08-28
description: "简单的大纲，以作纪念"
tags:
  - ai
  - 心理学
  - 计算神经科学
language: '中文'
heroImage: { src: './logo.png', color: '#0b8cc3' }
---
# 第四期神经计算建模及编程培训笔记

课表如下：

|        |                  |                    |                                      |          |
| ------ | ---------------- | ------------------ | ------------------------------------ | -------- |
| 周次   | 日期             | 时间               | 上课内容                             | 上课老师 |
| 第一周 | 周日 (2025.8.17) | 上午 10:00 - 10:30 | 开课仪式                             | 张天秋   |
|        |                  | 上午 10:30 - 12:00 | 神经计算建模简介                     | 吴思     |
|        |                  | 下午 15:00 - 17:00 | Python & BrainPy 编程基础            | 贺思超   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周一 (2025.8.18) | 上午 10:00 - 12:00 | Hodgkin - Huxley 神经元模型          | 陈啸宇   |
|        |                  | 下午 15:00 - 17:00 | Hodgkin - Huxley 神经元编程实现      | 张天秋   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周二 (2025.8.19) | 上午 10:00 - 12:00 | 简化神经元模型及其动力学分析         | 吕沐洋   |
|        |                  | 下午 15:00 - 17:00 | 简化神经元模型编程实现               | 王超名   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周三 (2025.8.20) | 上午 10:00 - 12:00 | 突触模型及编程                       | 王超名   |
|        |                  | 下午 15:00 - 17:00 | 长 / 短时程可塑性模型及编程          | 褚天昊   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周四 (2025.8.21) | 上午 10:00 - 12:00 | 【前沿讲座】马雷老师                 |          |
|        |                  | 下午 15:00 - 17:00 | 【前沿讲座】李松娗老师               |          |
|        | 周六 (2025.8.23) | 上午 10:00 - 12:00 | 抉择网络模型及其编程实现             | 刘潇     |
|        |                  | 下午 15:00 - 17:00 | 兴奋抑制平衡网络及其编程实现         | 邹晓龙   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
| 第二周 | 周日 (2025.8.24) | 上午 10:00 - 12:00 | 连续吸引子网络模型及其编程实现（上） | 褚天昊   |
|        |                  | 下午 15:00 - 17:00 | 连续吸引子网络模型及其编程实现（下） | 左峻枫   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周一 (2025.8.25) | 上午 10:00 - 12:00 | 循环神经网络训练算法                 | 董行思   |
|        |                  | 下午 15:00 - 17:00 | 循环神经网络 + 库网络实战            | 彭相源   |
|        |                  | 晚上 20:00 - 21:00 | 交流答疑                             | 教员     |
|        | 周二 (2025.8.26) | 上午 10:00 - 12:00 | 【前沿讲座】弭元元老师               |          |
|        |                  | 下午 15:00 - 17:00 | 【前沿讲座】陈国璋老师               |          |
|        | 周三 (2025.8.27) | 上午 10:00 - 12:00 | 脉冲神经网络训练及其实现             | 邹晓龙   |
|        |                  | 下午 15:00 - 17:00 | 结课仪式、吴思教授答疑               |          |

## Hodgkin - Huxley 神经元模型

$$
\begin{aligned}  
    C_m \frac {dV} {dt} &= -(\bar{g}_{Na} m^3 h (V -E_{Na})  
    + \bar{g}_K n^4 (V-E_K) + g_{leak} (V - E_{leak})) + I(t) \quad\quad \\  
    \frac {dx} {dt} &= \phi[\alpha_x (1-x)  - \beta_x], \quad x\in {\rm{\{m, h, n\}}} \quad\quad \\  
    \alpha_m(V) &= \frac {0.1(V+40)}{1-\exp(\frac{-(V + 40)} {10})} \quad\quad \\  
    \beta_m(V) &= 4.0 \exp(\frac{-(V + 65)} {18}) \quad\quad \\  
    \alpha_h(V) &= 0.07 \exp(\frac{-(V+65)}{20}) \quad\quad \\  
    \beta_h(V) &= \frac 1 {1 + \exp(\frac{-(V + 35)} {10})} \quad\quad \\  
    \alpha_n(V) &= \frac {0.01(V+55)}{1-\exp(-(V+55)/10)} \quad\quad \\  
    \beta_n(V) &= 0.125 \exp(\frac{-(V + 65)} {80}) \quad\quad \\  
    \phi&=Q_{10}^{(T-T_{base})/10}
\end{aligned}
$$

![image-20250820094200625](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250820094200625.png)

## 简化神经元模型及其动力学分析

### the LIF neuron model

**Leaky Integrate-and-Fire Model 泄漏整合发放模型**
$$
\tau\frac{dV}{dt}=-(V-V_{rest})+RI(t)\\
if\; V>V_{th}, V\leftarrow V_{reset}\quad last \; t_{ref}
$$

### other univariate neuron model

**the Quadratic Integrate-and-Fire model 二次整合发放（QIF）模型**
$$
\tau\frac{dV}{dt}=a_0(V-V_{rest})(V-V_c)+RI(t)\\
if\;V>\theta ,V\leftarrow V_{reset}\quad last\;t_{ref}
$$
**The Theta neuron model Theta 神经元模型**
$$
\frac{d\theta}{dt}=1-\cos{\theta}+(1+\cos{\theta})(\beta+I(t))
$$
*θ* 可以被看作是描述神经元状态的一种抽象方式。它类似于将神经元复杂的生物物理过程，如离子通道的开闭、膜电位的累积和变化等，映射到一个维度上，用*θ* 的不同取值来代表神经元处于不同的功能状态。比如，当*θ* 达到一定范围时，对应着神经元接近发放动作电位的状态。

**The Exponential Integrate-and-Fire model 指数整合发放(ExpIF)模型**
$$
\tau\frac{dV}{dt}=-(V-V_{rest})+\Delta_Te^{\frac{V-V_T}{\Delta_T}}+  RI(t)\\
if\; V>\theta, V\leftarrow V_{reset}\quad last \; t_{ref}
$$
真实神经元在接受输入电流时，当膜电位接近发放阈值（但未达到），其电位上升速率会**随电位升高而加速**（非线性增长），而非 LIF 模型假设的线性积累。

![image-20250820160335624](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250820160335624.png)

### The AdEx neuron model

**Adaptive Exponential Integrate-and-Fire Model 适应性指数整合发放模型**
$$
\tau_m\frac{dV}{dt}=-(V-V_{rest})+\Delta_Te^{\frac{V-V_T}{\Delta_T}}-R_w+  RI(t)\\
\tau_w\frac{dw}{dt}=a(V-V_{rest})-w+b\tau_w\sum_{t^{(f)}}\delta(t-t^{(f)})\\
if\; V>\theta, V\leftarrow V_{reset}\quad last \; t_{ref}
$$

![image-20250820154421718](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250820154421718.png)

### other multivariate neuron model

**the lzhikevich model**
$$
\frac{dV}{dt}=0.04V^2+5V+140-u+I\\
\frac{du}{dt}=a(bV-u)\\
if \; V>\theta,\quad V\leftarrow c,u\leftarrow u+d\quad last\;t_{ref}
$$
![image-20250820161305549](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250820161305549.png)

**the FitzHugh-Nagumo(FHN) model** 具有连续性
$$
\frac{du}{dt}=u-\frac{u^3}{3}-w+RI_{ext}\\
\tau\frac{dw}{dt}=v+a-bw
$$
**the Generalized Integrate-and Fire (GIF) model**
$$
\tau\frac{dV}{dt}=-(V-V_{rest})+R\sum_jI_j+RI\\
\frac{d\theta}{dt}=a(V-V_{rest})-b(\theta-\theta_\infty)
\frac{dI_j}{dt}=-k_jI_j,\quad j=1,2,...,n\\
if \;V>\theta,I_j\leftarrow R_jI_j+A_j,V\leftarrow V_{reset},\theta\leftarrow max(\theta_{reset},\theta)
$$
![image-20250820163442917](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250820163442917.png)

## 突触模型

### 现象学模型

**Exponential Model**
$$
\tau\frac{dg_{syn}(t)}{dt}=-g_{syn}(t)+\bar g_{syn}\delta(t_0-t)
$$
$\tau$为时间常数，$g_{syn} $为突触电导，$\bar g_{syn} $为最大电导，$t_0$为动作电位触发时刻

![image-20250822205722918](C:\Users\50376\Pictures\Screenshots\屏幕截图 2025-08-22 205757.png)

**Dual Exponential Model**
$$
g_{\text{syn}}(t) = \bar{g}_{\text{syn}} \cdot \frac{\tau_1 \tau_2}{\tau_1 - \tau_2} \left( \exp\left( -\frac{t - t_0}{\tau_1} \right) - \exp\left( -\frac{t - t_0}{\tau_2} \right) \right)
$$
$\tau_1$是突触衰减时间常数（控制电导下降阶段的速率），$\tau_2$是突触上升时间常数（控制电导上升阶段的速率），等价于：
$$
g_{syn}(t)=\bar g_{syn}g\\
\frac{dg}{dt}=-\frac{g}{\tau_{decay}}+h\\
\frac{dh}{dt}=-\frac{h}{\tau_{rise}}+\delta(t_0-t)
$$
![屏幕截图 2025-08-22 205757](C:\Users\50376\Pictures\Screenshots\屏幕截图 2025-08-22 205930.png)

### 动力学模型

**AMPA kinetic Model**
$$
\frac{ds}{dt}=\alpha[T](1-s)-\beta s\\
I=\bar g s(V-E)
$$
E为**反转电位**，决定突触是兴奋还是抑制

![image-20250822211437456](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250822211437456.png)

**NMDA synapse model**

描述 NMDA 受体（N - 甲基 - D - 天冬氨酸受体）介导突触传递的动力学机制，核心聚焦 “谷氨酸结合 + 膜电位依赖的 Mg²⁺ 阻滞” **双重门控**特性 ：NMDA 受体的离子通道开放，**必须同时满足两个条件**：

1. **谷氨酸（递质）结合**：突触前释放谷氨酸，与 NMDA 受体结合，对应模型中 “受体状态转换（`s` 相关动力学）”；
2. **膜电位去极化解除 Mg²⁺ 阻滞**：静息态（如膜电位 `Vm = -65 mV`）时，胞外 Mg²⁺ 会阻塞通道；只有膜电位去极化（如 `Vm = -20 mV` ），Mg²⁺ 才会脱离，通道才能通透离子（Na⁺、Ca²⁺、K⁺ ）。

$$
% 受体状态转换动力学方程
\frac{ds}{dt} = \alpha [T] (1 - s) - \beta s\\

% NMDA 受体电流方程（含 Mg²⁺ 阻滞）
I = \bar{g} \, s \, B(V) \, (V - E)\\

% Mg²⁺ 阻滞的电压依赖因子
B(V) = \frac{1}{1 + \exp(-0.062V) \cdot \frac{[Mg^{2+}]_o}{3.57}}
$$



## 短 / 长时程可塑性模型

### 短时程可塑性

**三因子短时抑制模型（Three-Factor Short-Term Depression, STD Model）**
$$
\frac{d x(t)}{d t}=\frac{z(t)}{\tau_{rec }}-U_{S E} x(t) \delta\left(t-t_{s p}\right)\\
\frac{d y(t)}{d t}=-\frac{y(t)}{\tau_{i n}}+U_{S E} x(t) \delta\left(t-t_{s p}\right)\\
x(t)+y(t)+z(t)=1\\
\frac{d g(t)}{d t}=-\frac{g(t)}{\tau_{s}}+g_{max } y(t)
$$
**神经递质消耗动力学简化模型（Simplified Dynamics of Neurotransmitter Consumption Model）**
$$
\frac{d x(t)}{d t}=\frac{1-x(t)}{\tau_{r e c}}-U_{S E} x^{-} \delta\left(t-t_{s p}\right)\\
\frac{d g(t)}{d t}=-\frac{g(t)}{\tau_{s}}+A U_{S E} x^{-} \delta\left(t-t_{s p}\right)\\
EPSC =A U_{S E} x^{-}
$$
![image-20250823180310450](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250823180310450.png)

**神经递质释放概率模型（Neurotransmitter Release Probability Model）**

based on spiking time
$$
\frac{d u(t)}{d t}=\frac{-u(t)}{\tau_{f}}+U_{S E}\left(1-u^{-}\right) \delta\left(t-t_{s p}\right)\\
\frac{d x(t)}{d t}=\frac{1-x(t)}{\tau_{d}}-u^{+} x^{-} \delta\left(t-t_{s p}\right)\\
\frac{d g(t)}{d t}=-\frac{g(t)}{\tau_{s}}+A u^{+} x^{-} \delta\left(t-t_{s p}\right)\\
EPSC=A u^{+} x^{-}, u^{+}=\lim *{t-t*{s p} \to 0^{+}} u(t)
$$
![image-20250823180012317](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250823180012317.png)

based on firing rate
$$
\frac{d u(t)}{d t}=\frac{-u(t)}{\tau_{f}}+U_{S E}\left(1-u(t)\right)R(t)\\
\frac{d x(t)}{d t}=\frac{1-x(t)}{\tau_{d}}-u^{+} xR(t)\\
g(t)=\tau_sA u^+xR(t)\\
u^+=u(t)+U_{SE}[1-u(t)]
$$
![image-20250823193318951](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250823193318951.png)

### 长时程可塑性

**Spike-time Dependent Plasticity**

突触权重的变化分为 LTP 和 LTD 两种情况，依赖 Δt（Δt = 突触后尖峰时间 - 突触前尖峰时间）：

- **LTP（Δt > 0，前先于后）**：权重正向增加，增幅随 Δt 增大而指数衰减：
  $$
  \Delta w^+=F_+(w)*exp(-|\Delta t|/\tau_+)
  $$
  
- **LTD（Δt ≤ 0，后先于前）**：权重负向减少，减幅随 |Δt | 增大而指数衰减：
  $$
  \Delta w^-=-F_-(w)*exp(-|\Delta t|/\tau_-)
  $$

- **实现机制**

$$
\frac{dx_j}{dt}=-\frac{x_j}{\tau_x}+\sum_{t_j^f}\delta(t-t_j^f)\\
\frac{dy_i}{dt}=-\frac{y_i}{\tau_y}+\sum_{t_i^f}\delta(t-t_i^f)\\
\frac{dw_{ij}}{dt}=-F_-(w_{ij})y_i(t)\delta(t-t_i^f)+F_+(w_{ij})x_j(t)\delta(t-t_j^f)
$$

![image-20250823195627168](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250823195627168.png)

![image-20250823195653404](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250823195653404.png)

## 抉择网络模型

### Spiking DM Model 脉冲决策神经网络

$$
C_m \frac{d V(t)}{d t}=-g_L\left(V(t)-V_L\right)-I_{s y n}(t)  \\
I_{s y n}(t)=I_{\text {ext,AMPA }}(t)+I_{\text {rec }, A M P A}(t)+I_{\text {rec }, N M D A}(t)+I_{\text {rec }, \mathrm{GABA}}(t)  
$$

其中
$$
\begin{gathered}  
I_{\text {ext,AMPA }}(t)=g_{\text {ext,AMPA }}\left(V(t)-V_E\right) s^{\text {ext,AMPA }}(t) \\  
I_{\text {rec,AMPA }}(t)=g_{\text {rec,AMPA }}\left(V(t)-V_E\right) \sum_{j=1}^{C_E} w_j s_j^{A M P A}(t) \\  
I_{\text {rec,NMDA }}(t)=\frac{g_{\mathrm{NMDA}}\left(V(t)-V_E\right)}{\left(1+\left[\mathrm{Mg}^{2+}\right] \exp (-0.062 V(t)) / 3.57\right)} \sum_{j=1}^{\mathrm{C}_E} w_j s_j^{\mathrm{NMDA}}(t) \\  
I_{\mathrm{rec}, \mathrm{GABA}}(t)=g_{\mathrm{GABA}}\left(V(t)-V_l\right) \sum_{j=1}^{C_1} s_j^{\mathrm{GABA}}(t)  
\end{gathered}  
$$
![image-20250824162005938](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824162005938.png)

![image-20250824162238113](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824162238113.png)

![image-20250824162300289](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824162300289.png)

### Rate DM Model 速率决策神经网络

$$
r_i = F(x_i) = \frac{ax_i - b}{1-\exp(-d(ax_i-b))}\\
\frac{dS_1}{dt} = F(x_1)\,\gamma(1-S_1)-S_1/\tau_s\\
\frac{dS_2}{dt} = F(x_2)\,\gamma(1-S_2)-S_2/\tau_s\\
x_1 = J_E S_1 + J_I S_2 + I_0 + I_{noise1} + J_{ext}\mu_1\\
x_2 = J_E S_2 + J_I S_1 + I_0 + I_{noise2} +J_{ext}\mu_2\\
dI_{noise1} = - I_{noise1} \frac{dt}{\tau_0} + \sigma dW \\
dI_{noise2} = - I_{noise2} \frac{dt}{\tau_0} + \sigma dW\\
\mu_1 =\mu_0(1+c'/100)\\
\mu_2 =\mu_0(1-c'/100)
$$

![image-20250824163919029](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824163919029.png)

![image-20250824163941574](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824163941574.png)

## 兴奋抑制平衡网络

### An E-I balance neural network

![image-20250824210233805](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824210233805.png)
$$
\tau \frac{du_i^E}{dt} = -u_i^E + \sum_{j=1}^{K_E} J_{EE} r_j^E + \sum_{j=1}^{K_I} J_{EI} r_j^I + I_i^E\\



\tau \frac{du_i^I}{dt} = -u_i^I + \sum_{j=1}^{K_I} J_{II} r_j^I + \sum_{j=1}^{K_E} J_{IE} r_j^I + I_i^I
$$
整体结构均为**自身衰减 + 突触输入整合 + 外部输入**

假设每个神经元以平均发放率$\mu$、方差$σ^2$不规则发放：

兴奋性（E）神经元接收的 recurrent 输入的均值： $~K_E J_{EE} μ+K_I J_{EI} μ$

兴奋性（E）神经元接收的 recurrent 输入的方差: $~K_E (J_{EE })^2 σ^2+K_I (J_{EI })^2 σ^2$

**平衡条件**: 

- $K_E J_{EE}+K_I J_{EI }≈0$; 均值接近零
- $J_{EE}\sim\frac{1}{\sqrt{K_E} },J_{EI}\sim\frac{1}{\sqrt{K_I} }$ ;方差为 1 阶



### Neurons connected with plastic feedforward inhibition

**前馈抑制可塑性神经元模型**

![image-20250824210936265](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824210936265.png)
$$
% 神经元动力学方程
\tau \frac{dV_i}{dt} = \left( V^\text{rest} - V_i \right) + \left( g_i^E (V^E - V_i) + g_i^I (V^I - V_i) + I_b \right) \times \frac{1}{g^\text{leak}}\\

% 突触后电导更新（接收脉冲时）
g_i^E \to g_i^E + \Delta g_{ij}^E, \quad g_i^I \to g_i^I + \Delta g_{ij}^I\\

% 电导衰减动力学
\tau_E \frac{dg_i^E}{dt} = -g_i^E, \quad \tau_I \frac{dg_i^I}{dt} = -g_i^I\\

% 电导变化量与权重的关系
\Delta g_{ij} = \bar{g} \, W_{ij}\\

% 权重可塑性说明（文本，非公式）
\text{$W_{ij}$ can be plastic or fixed}
$$
**Spiking-timing-dependent learning rule:**
$$
\Delta w=\eta(pre\times post-\rho_0\times pre)
$$
![image-20250824211721014](C:\Users\50376\AppData\Roaming\Typora\typora-user-images\image-20250824211721014.png)

## 连续吸引子网络模型

## 循环神经网络

## 脉冲神经网络训练
