[![Downloads](https://img.shields.io/github/downloads/OliverBrotchie/phantom/total)](https://github.com/OliverBrotchie/phantom/releases) [![Gitter](https://badges.gitter.im/phantom-minecraft/community.svg)](https://gitter.im/phantom-minecraft/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![License](https://img.shields.io/github/license/OliverBrotchie/phantom)](https://opensource.org/licenses/MIT) [![Stars](https://img.shields.io/github/stars/OliverBrotchie/phantom)]

# phantom

Makes hosted Bedrock/MCPE servers show up as LAN servers, specifically for consoles.

You can now play on remote servers (not Realms!) on your Xbox and PS4 with friends.

It's like having a LAN server that's not actually there, spooky.

This is a graphical user interface for jhead's orignal command line application:
https://github.com/jhead/phantom

## Installing

[Download](https://github.com/OliverBrotchie/phantom/releases) phantom from the releases page.

Also available for Linux on the snapstore at: https://snapcraft.io/phantom

## Usage

Just use the correct installer for your operating system and enjoy!

If you are stuck, use -help.

## Running multiple instances

I recommend running the original command line version instead: https://github.com/jhead/phantom

## How does this work?

On Minecraft platforms that support LAN servers, the game will broadcast a
server ping packet to every device on the same network and display any valid
replies as connectable servers. This tool runs on your computer - desktop,
laptop, Raspberry Pi, etc. - and pretends to be a LAN server, acting as a proxy,
passing all traffic from your game through your computer and to the server
(and back), so that Minecraft thinks you're connected to a LAN server, but
you're really playing on a remote server. As soon as you start it up, you should
see the fake server listed under LAN and, upon selecting it, connect to the real
Bedrock/MCPE server hosted elsewhere.

For an optimal experience, run this on a device that is connected via ethernet
and not over WiFi, since a wireless connection could introduce some lag. Your
game device can be connected to WiFi. Your remote server can be running on a
computer, a VM, or even with a Minecraft hosting service.

## Supported platforms

- This tool should work on Windows, macOS, and Linux.
- Minecraft for Windows 10, iOS/Android, Xbox One, and PS4 are currently supported.
- **Nintendo Switch is not supported.**

## Note

You almost definitely need to create a firewall rule for this to work.
On macOS, you'll be prompted automatically. On Windows, you may need to go into
your Windows Firewall settings and open up all UDP ports for phantom.

Again look at https://github.com/jhead/phantom for support on how to do that...
